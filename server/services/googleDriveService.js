import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });

const uploadToGoogleDrive = async (filePath) => {
    try {
        const drive = google.drive({ version: 'v3', auth: oauth2client });

        const uniqueFileName = `file_${Date.now()}_${Math.floor(Math.random() * 100000)}.pdf`;

        const requestBody = {
            name: uniqueFileName,
            fields: 'id',
        };

        const media = {
            mimeType: 'application/pdf',
            body: fs.createReadStream(filePath),
        };

        const file = await drive.files.create({
            requestBody,
            media,
        });

        return file.data.id;
    } catch (err) {
        console.error('Error uploading file to Google Drive:', err);
        throw err;
    }
};

const deleteFromGoogleDrive = async (fileId) => {
    try {
       
        const drive = google.drive({ version: 'v3', auth: oauth2client });

        const response = await drive.files.delete({
            fileId: fileId
        });

       
        return response.data;
    } catch (err) {
        console.error('Error deleting file from Google Drive:', err);
        throw err;
    }
};

const generatePublicURL = async (fileId) => {
    try {
        const drive = google.drive({ version: 'v3', auth: oauth2client });

        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });

        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink'
        });

       
        return result.data;
    } catch (err) {
        console.error('Error generating public URL:', err);
        throw err;
    }
};

export { uploadToGoogleDrive, deleteFromGoogleDrive, generatePublicURL };
