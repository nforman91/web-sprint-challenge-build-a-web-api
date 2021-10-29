// add middlewares here related to actions
const Actions = require('../actions/actions-model');

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

module.exports = {
    validateActionId,
    validateAction,
}
