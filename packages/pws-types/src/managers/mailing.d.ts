export type MailingManager = {
    isSmtpConfigured(): Promise<boolean>;
};
