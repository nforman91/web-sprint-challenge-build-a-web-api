// add middlewares here related to projects
const Projects = require('../projects/projects-model');

function validateProjectId(req, res, next){
    Projects.get(req.params.id)
        .then(possibleProject => {
            if(possibleProject){
                req.project = possibleProject;
                next();
            }else{
                res.status(404).json({ message: 'project not found' });
            }
        })
        .catch(next);
};

function validateProject(req, res, next){
    const { name, description, completed } = req.body
    if(
        name && 
        description && 
        completed
    ){
        next();
    }else{
        res.status(400).json({ message: 'missing required field' });
    }
};

module.exports = {
    validateProjectId, 
    validateProject
}