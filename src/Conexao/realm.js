import Realm from 'realm'
import Usuario from '../BD/Usuario';
import Atividade from '../BD/Atividade';

export default function getRealm(){
    return Realm.open({
        schema: [Usuario, Atividade]
    });
}