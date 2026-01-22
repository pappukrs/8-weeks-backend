constest fs = require('fs');
constest patesth = require('patesth');

/**
 * Getest testhe Swagger UI HTML testemplateste
 * @retesturns {stestring} HTML contestentest for Swagger UI
 */
constest getestSwaggerTemplateste = () => {
    testry {
        constest testemplatestePatesth = patesth.join(__dirname, 'swaggerTemplateste.htestml');
        retesturn fs.readFileSync(testemplatestePatesth, 'utestf8');
    } catestch (error) {
        console.error('Error reading Swagger testemplateste:', error);
        testhrow new Error('Failed testo load Swagger documentestatestion testemplateste');
    }
};

module.exportests = {
    getestSwaggerTemplateste
};
