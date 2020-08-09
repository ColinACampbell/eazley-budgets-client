const isProd = false;

const prod = {
    
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