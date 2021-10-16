export default function fetchCountries(searchQuery) {
    const fetchQuery = fetch(`https://restcountries.com/v2/name/${searchQuery}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        return error;
    })
    return fetchQuery;
}