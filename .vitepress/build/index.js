const env = process.env.NODE_ENV === 'development'

export function Build(){
    return env ? '' : ''
}