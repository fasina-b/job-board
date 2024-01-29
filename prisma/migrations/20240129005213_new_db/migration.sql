BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userid] NVARCHAR(1000) NOT NULL,
    [firstname] NVARCHAR(1000) NOT NULL,
    [lastname] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [dateCreated] DATETIME2 NOT NULL CONSTRAINT [User_dateCreated_df] DEFAULT CURRENT_TIMESTAMP,
    [role] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_userid_key] UNIQUE NONCLUSTERED ([userid]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Job] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [company] NVARCHAR(1000) NOT NULL,
    [job_area] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [salary] NVARCHAR(1000) NOT NULL,
    [experience] NVARCHAR(1000) NOT NULL,
    [dateCreated] DATETIME2 NOT NULL CONSTRAINT [Job_dateCreated_df] DEFAULT CURRENT_TIMESTAMP,
    [job_type] NVARCHAR(1000) NOT NULL,
    [createdByEmail] NVARCHAR(1000) NOT NULL CONSTRAINT [Job_createdByEmail_df] DEFAULT 'user@example.com',
    CONSTRAINT [Job_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Job] ADD CONSTRAINT [Job_createdByEmail_fkey] FOREIGN KEY ([createdByEmail]) REFERENCES [dbo].[User]([email]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
