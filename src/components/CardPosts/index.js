import React from 'react';
export function CardPosts({ post }) {
    return (
        <div className='wrapper'>
            <div class=" grid grid-rows-4 grid-flow-col gap-4 rounded overflow-hidden shadow-lg">
                <img class="w-full" src="https://static.wikia.nocookie.net/mitologa/images/a/a3/Imagen_por_defecto.png/revision/latest/thumbnail/width/360/height/360?cb=20150824230838&path-prefix=es" alt="Sunset in the mountains" />
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{post.title}</div>
                    <p class="text-gray-700 text-base">
                        {post.description}                    </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{post.category}</span>

                </div>
            </div>
        </div>
    );
}
