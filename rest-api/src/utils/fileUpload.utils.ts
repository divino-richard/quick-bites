import fs from 'fs';

export function deleteMerchantDocuments(files: {[fieldname: string]: Express.Multer.File[]}) {
    fs.unlink(files['businessLicense'][0].path, (error) => {
        if(error) {
            console.log('Business license deletion error: ', error);
        }
    });

    fs.unlink(files['taxRegistration'][0].path, (error) => {
        if(error) {
            console.log('Tax Registration deletion error: ', error);
        }
    });

    fs.unlink(files['onwerIdentification'][0].path, (error) => {
        if(error) {
            console.log('Owner ID deletion error: ', error);
        }
    });
}