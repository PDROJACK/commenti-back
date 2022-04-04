import { HookContext } from "@feathersjs/feathers";

const addreply = async (context: HookContext) => {
    
    const { _id, parent } = context.result;

    if(parent !== undefined) {
        
        const parentComment = await context.service.get(parent);
        
        parentComment.replies.push( _id );
        
        context.service.update(parent,parentComment);
    }

};

export default addreply;