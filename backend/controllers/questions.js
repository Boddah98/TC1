// **************** json data management ****************
const fs = require('fs');
const path = require ('path');

//For questions data
const questionsFilePath = path.join(__dirname,'../../data/questions.json');

module.exports = class Controller{
    
    static getQuestionSet = async (req, res) => {
        
        fs.readFile(questionsFilePath, 'utf8',(err, data)=>{
            if(err){
                console.error('Error de lectura de datos',err);
                return;
            }
            const jsonQuestionsData = JSON.parse(data);
            return res.send({
                code : 200,
                data : jsonQuestionsData
            });
        });
    }
}