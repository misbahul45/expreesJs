const fetchApi = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/users');
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
};

fetchApi();
