let formData = new FormData()

console.log('formData', formData);

formData.append('token', 'aaaa')
console.log('token', formData.get('token'));
formData.append('content', 'bbbb')
console.log('content', formData.get('content'));
