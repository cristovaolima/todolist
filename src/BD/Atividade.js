export default class AtividadeBD{
    static schema = {
        name: 'Atividade',
        primaryKey: 'id',
        properties: {
            id: { type: 'int', indexed: true},
            titulo: 'string',
            status: 'string'
        }
    }
}