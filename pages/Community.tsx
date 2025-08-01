import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { CommunityPost } from '../types';

const posts: CommunityPost[] = [
    {
        id: '1',
        author: 'Ana Pérez',
        avatar: 'https://picsum.photos/seed/user1/100/100',
        timestamp: 'hace 2 horas',
        content: '¡Hola a todos! Solo quería compartir una pequeña victoria. Hoy, mi hijo Leo (4 años) usó su tablet de comunicación para pedir jugo por primera vez sin que se lo pidiéramos. ¡Estoy tan orgullosa! A veces los días son duros, pero estos momentos lo valen todo.',
        comments: 12,
        likes: 45
    },
    {
        id: '2',
        author: 'Marcos Solís',
        avatar: 'https://picsum.photos/seed/user2/100/100',
        timestamp: 'hace 8 horas',
        content: 'Buscando consejos. ¿Alguien tiene alguna estrategia que funcione para las transiciones difíciles por la mañana? Salir para la escuela se ha vuelto una batalla campal. Cualquier idea es bienvenida. Gracias.',
        comments: 25,
        likes: 18
    },
     {
        id: '3',
        author: 'Sofía Castro',
        avatar: 'https://picsum.photos/seed/user3/100/100',
        timestamp: 'hace 1 día',
        content: 'Recomendación de libro: "Uniquely Human" de Barry M. Prizant ha cambiado completamente mi perspectiva. Me ha ayudado a entender mejor a mi hija y a enfocarme en sus fortalezas. ¡Totalmente recomendado si tienen la oportunidad de leerlo!',
        comments: 8,
        likes: 32
    }
];

const Community: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
        <Card>
            <div className="p-4">
                <textarea 
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm bg-white text-slate-900 placeholder:text-slate-400" 
                  placeholder="Comparte una experiencia o haz una pregunta..."
                  rows={3}
                ></textarea>
                <div className="flex justify-end mt-2">
                    <Button>Publicar</Button>
                </div>
            </div>
        </Card>

        {posts.map(post => (
            <Card key={post.id}>
                <div className="p-5">
                    <div className="flex items-center">
                        <img src={post.avatar} alt={post.author} className="h-10 w-10 rounded-full" />
                        <div className="ml-3">
                            <p className="text-sm font-semibold text-slate-900">{post.author}</p>
                            <p className="text-xs text-slate-500">{post.timestamp}</p>
                        </div>
                    </div>
                    <p className="mt-4 text-slate-700">{post.content}</p>
                </div>
                <div className="border-t border-slate-200 px-5 py-3 flex justify-between text-sm text-slate-600">
                    <button className="hover:text-teal-600">❤️ {post.likes} Me gusta</button>
                    <button className="hover:text-teal-600">💬 {post.comments} Comentarios</button>
                    <button className="hover:text-teal-600">↪️ Compartir</button>
                </div>
            </Card>
        ))}
    </div>
  );
};

export default Community;