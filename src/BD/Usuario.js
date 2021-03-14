export default class UsuarioBD{
    static schema = {
        name: 'Usuario',
        primaryKey: 'id',
        properties: {
            id: { type: 'int', indexed: true},
            nome: 'string',
            email: 'string',
            senha: 'string'
        }
    }
}