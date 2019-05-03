const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to mongodb'))
    .catch(err => console.log('Error ', err));

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
    const course = new Course({
        name: 'Tarun Chawla',
        author: 'Tarun Chawla',
        tags: ['Angular', 'Backend'],
        date: Date.now(),
        isPublished: true
    })
    const result = await course.save();
    console.log(result);
}
async function updateCourse1(id) {
    const course = await Course.findById(id);
    if (!course) return;

    course.isPublished = true;
    course.author = 'Another author'
    // course.set({
    //     isPublished: true,
    //     author: 'Another author'
    // })
    const result = await course.save();
    console.log(result);
}

async function updateCourse2(id) {
    const result = await Course.update({ _id: id }, {
        $set: {
            name: 'Tarun Goel',
            author: 'Tarun Chawla'
        }
    });
    console.log(result);
}
async function updateCourse3(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            name: 'Tarun Chawla',
            author: 'Tarun Chawla'
        }
    }, { new: true });
    console.log(course);
}
async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}

//updateCourse1('5cc717ec26592347a82f0f3c');
//updateCourse2('5cc717ec26592347a82f0f3c');
// updateCourse3('5cc717ec26592347a82f0f3c');
removeCourse('5cc717ec26592347a82f0f3c');
//createCourse();
