const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to Mongodb'))
    .catch(err => console.error('Could not connect to mongodb', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
    const course = new Course({
        name: 'Angular',
        author: 'Tarun Chawla',
        tags: ['angular', 'frontend'],
        isPublished: true
    })

    const result = await course.save();
    console.log(result);
}
async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    // const courses = await Course.find();
    // console.log(courses);
    const courses = await Course
        .find({ author: 'Tarun Chawla', isPublished: true })
        //.find({price:{$gte:10,$lte:20}})
        //.find({price:{$in:[10,15,20]}})
        //.skip((pageNumber-1)*pageSize)
        //.limit(pageSize)
        .limit(10)
        .sort({ name: 1 })
        //.count()
        .select({ name: 1, tags: 1 });
    console.log(courses);
}
/*async function getCourses() {
    // const courses = await Course.find();
    // console.log(courses);
    const courses = await Course
        .find()
        .or([{ author: 'Tarun Chawla' }, { isPublished: true }])
        //.and()
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}*/
// async function getCourses() {
//     // const courses = await Course.find();
//     // console.log(courses);
//     const courses = await Course
//         //.find()
//         //.or([{ author: 'Tarun Chawla' }, { isPublished: true }])
//         //.and()
//         .find({author:/^Tarun/})
//         .find({author:/Chawla$/})
//         .find({author:/.*Tarun.*/})
//         .limit(10)
//         .sort({ name: 1 })
//         .select({ name: 1, tags: 1 });
//     console.log(courses);
// }
getCourses();
//createCourse();