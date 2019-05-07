const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/new-database-validation')
    .then(() => console.log('Connected to Mongodb'))
    .catch(err => console.error('Could not connect to mongodb', err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250,
        // match: /pattern/
    },
    category: {
        type: String,
        require: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        //uppercase:true
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            // validator: function (v) {
            //     return v && v.length > 0
            // },
            validator: function (v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000)
            },
            message: 'A course should have at least one tag'
        }
    }, 
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        min: 10,
        max: 20,
        required: function () { return this.isPublished },
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
    const course = new Course({
        name: 'Nodejs',
        category: 'Web',
        author: 'Tarun Chawla',
        tags: ['node', 'backend'],
        //tags: [],
        //tags: null,
        isPublished: true,
        price: 19.8
    })
    try {
        //await course.validate((err)=>{
        //if(err){}
        //});
        const result = await course.save();
        console.log(result);
    } catch (ex) {
        // console.log('Error: ', ex.message);
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
}

createCourse();
