const string = 'image/png';

let stringNew = 'filename'

const fileName = () => {
    const suffix = string.split('/')[1];
    const fullString = `${stringNew}.${suffix}`
    console.log(fullString)
}

fileName();