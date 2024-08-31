BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] VARCHAR(50) NOT NULL,
    [password] VARCHAR(50) NOT NULL,
    [createdAt] DATETIME2 NOT NULL,
    [lastLogin] DATETIME2,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Todo] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [isDone] BIT,
    [createdAt] DATETIME2 NOT NULL,
    [userId] INT,
    CONSTRAINT [Todo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[DeletedTodo] (
    [id] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [isDone] BIT,
    [createdAt] DATETIME2 NOT NULL,
    [deletedAt] DATETIME2 NOT NULL,
    [userId] INT,
    CONSTRAINT [DeletedTodo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Todo_id_title_idx] ON [dbo].[Todo]([id], [title]);

-- AddForeignKey
ALTER TABLE [dbo].[Todo] ADD CONSTRAINT [Todo_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[DeletedTodo] ADD CONSTRAINT [DeletedTodo_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
