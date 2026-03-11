import mongoose from 'mongooose';

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    from:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        default: 'Add details about your order here'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});