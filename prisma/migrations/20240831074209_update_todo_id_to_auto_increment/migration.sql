/*
  Warnings:

  - The primary key for the `DeletedTodo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `DeletedTodo` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Int`.
  - The primary key for the `Todo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[DeletedTodo] DROP CONSTRAINT [DeletedTodo_pkey];
ALTER TABLE [dbo].[DeletedTodo] ALTER COLUMN [id] INT NOT NULL;
ALTER TABLE [dbo].[DeletedTodo] ADD CONSTRAINT DeletedTodo_pkey PRIMARY KEY CLUSTERED ([id]);

-- RedefineTables
BEGIN TRANSACTION;
DROP INDEX [Todo_id_title_idx] ON [dbo].[Todo];
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'Todo'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_Todo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [isDone] BIT,
    [createdAt] DATETIME2 NOT NULL,
    [userId] INT,
    CONSTRAINT [Todo_pkey] PRIMARY KEY CLUSTERED ([id])
);
SET IDENTITY_INSERT [dbo].[_prisma_new_Todo] ON;
IF EXISTS(SELECT * FROM [dbo].[Todo])
    EXEC('INSERT INTO [dbo].[_prisma_new_Todo] ([createdAt],[id],[isDone],[title],[userId]) SELECT [createdAt],[id],[isDone],[title],[userId] FROM [dbo].[Todo] WITH (holdlock tablockx)');
SET IDENTITY_INSERT [dbo].[_prisma_new_Todo] OFF;
DROP TABLE [dbo].[Todo];
EXEC SP_RENAME N'dbo._prisma_new_Todo', N'Todo';
CREATE NONCLUSTERED INDEX [Todo_id_title_idx] ON [dbo].[Todo]([id], [title]);
COMMIT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
