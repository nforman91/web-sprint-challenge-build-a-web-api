const Actions = require('../actions/actions-model');
const Projects = require('../projects/projects-model');

function logger(req, res, next) {
    const method = req.method;
    const url = req.baseUrl;
    const timestamp = new Date().toLocaleString();
    console.log(`${method} ${url} ${timestamp}`);
    next();
};

function validateActionId(req, res, next){
    Actions.get(req.params.id)
        .then(possibleAction => {
            if(possibleAction){
                req.action = possibleAction;
                next();
            }else{
                res.status(404).json({ message: 'action not found' })
            }
        })
        .catch(next)
}

function validateProjectId(req, res, next){
    Projects.get(req.params.id)
        .then(possibleProject => {
            if(possibleProject){
                req.project = possibleProject;
                next();
            }else{
                res.status(404).json({ message: 'project not found' })
            }
        })
        .catch(next)
}

function validateProject(req, res, next){
    const { name, description, completed } = req.body
    if(
        name, 
        description, 
        completed
    ){
        next();
    }else{
        res.status(400).json({ message: 'missing required field' })
    }
}

module.exports = {
    logger, 
    validateActionId,
    validateProjectId, 
    validateProject
}