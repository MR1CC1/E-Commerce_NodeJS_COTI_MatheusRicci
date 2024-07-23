BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [isAdmin] BIT NOT NULL CONSTRAINT [User_isAdmin_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Category] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Category_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Category_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Product] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [quantity] INT NOT NULL,
    [categoryId] INT NOT NULL,
    CONSTRAINT [Product_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Shopping_Cart] (
    [id] INT NOT NULL IDENTITY(1,1),
    CONSTRAINT [Shopping_Cart_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Product] ADD CONSTRAINT [Product_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[Category]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
