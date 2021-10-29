const Actions = require('../actions/actions-model');
const Projects = require('../projects/projects-model');
// const yup = require('yup');

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
                res.status(404).json({ message: 'action not found' });
            }
        })
        .catch(next);
};

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

function validateAction(req, res, next){
    const { project_id, description, notes, completed } = req.body
    if(
        project_id && 
        description && 
        notes &&
        completed
    ){
        next();
    }else{
        res.status(400).json({ message: 'missing required field' });
    }
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

// const projectSchema = yup.object().shape({
//     name: yup
//         .required('name required'),
//     description: yup
//         .required('description required'),
//     completed: yup
//         .required('completed value required')
// })

// async function validateProject(req, res, next){
//     try{
//         const validated = await projectSchema.validate(
//             req.body, 
//             { strict: false, stripUnknown: true }
//         )
//         req.body = validated
//         next()
//     }catch(err){
//         next({ status: 422, message: err.message })
//     }
// }

module.exports = {
    logger, 
    validateActionId,
    validateProjectId, 
    validateAction,
    validateProject
}