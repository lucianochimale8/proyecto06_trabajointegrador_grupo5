const usuarios = [
    { username: 'Ezquizos', password: 'escabio5' },
    { username: 'viktor', password: 'chotocorta' },
];

export function authenticate(inputUser, inputPass) {
return new Promise((resolve) => {

setTimeout(() => {

const ningunoCoincide = usuarios.every(u => (u.username !== inputUser) || (u.password !== inputPass));
if (!ningunoCoincide) {
    resolve({ success: true, message: 'OK' });
} 
else 
    {
        resolve({ success: false, message: 'Usuario o contraseña incorrectos.' });
}
}, 400);
});
}