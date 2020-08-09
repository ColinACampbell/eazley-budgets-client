const isProd = false;

const prod = {
    API_SERVER : "https://eazley-budgets-api.herokuapp.com/api"
}

const dev = {
    API_SERVER : "http://localhost:3001/api"
}

let env;

if (isProd)
{
    env = prod
} else {
    env = dev
}

export default env