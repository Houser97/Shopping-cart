'use client'
import { createReaction, updateReaction } from "@/actions/reactions/reactions";
import { Reaction, ReactionsEnum } from "@/domain/entities/reaction";
import { useAuthStore } from "@/store/auth/auth-store";
import { useState } from "react";

interface Props {
    totalReactions: Record<ReactionsEnum, number>;
    productId: string;
    reviewId: string;
    userReaction: Reaction;
}


export const Reactions = ({ totalReactions, userReaction, productId, reviewId }: Props) => {

    const [reactionEntity, setReactionEntity] = useState(userReaction)
    const [reactionCount, setReactionCount] = useState({
        love: totalReactions.love || 0,
        like: totalReactions.like || 0,
        dislike: totalReactions.dislike || 0
    })

    const status = useAuthStore(state => state.status);
    const user = useAuthStore(state => state.user);

    const updateLocalReactionsCount = (reaction: ReactionsEnum) => {
        setReactionCount(prev => {
            const newCounts = { ...prev };
            newCounts[reaction]++;
            if (reactionEntity) newCounts[reactionEntity.reaction]--;
            return newCounts;
        });
    }

    const onReaction = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!reactionEntity) {
            create(e)
        } else {
            update(e)
        }
    }

    const create = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const reaction = e.currentTarget.getAttribute('data-reaction');
        const newReaction = await createReaction(productId, reviewId, user!.id, reaction!)

        if (!newReaction) return;

        updateLocalReactionsCount(reaction! as ReactionsEnum);
        setReactionEntity(newReaction);
    }


    const update = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const newReaction = e.currentTarget.getAttribute('data-reaction');

        const response = await updateReaction(reactionEntity.id, reviewId, user!.id, newReaction!)

        if (!response) return false

        updateLocalReactionsCount(newReaction! as ReactionsEnum);
        setReactionEntity(response);
    }

    const setReactionColor = (color: string, reaction: string) => {
        const isValidReaction = reactionEntity ?? false;
        if (!isValidReaction) return '';
        return reactionEntity.reaction === reaction && color;
    }

    return (
        <>
            <button data-reaction='love' className={`flex flex-row items-center mr-3 ${status === 'authenticated' ? `cursor-pointer` : ''}`} onClick={(e) => onReaction(e)}>
                <svg className={`w-5 h-5 mr-2 pointer-events-none
                ${setReactionColor('fill-red-600', ReactionsEnum.LOVE)}`} viewBox="0 0 24 24"><title>heart</title><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /></svg>
                <div className='text-lg'>{reactionCount.love}</div>
            </button>

            <button data-reaction='like' className={`flex flex-row items-center mr-3 ${status === 'authenticated' ? `cursor-pointer` : ''}`} onClick={(e) => onReaction(e)}>
                <svg className={`w-5 h-5 mr-2 pointer-events-none
                ${setReactionColor('fill-blue-600', ReactionsEnum.LIKE)}`} viewBox="0 0 24 24"><path d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" /></svg>
                <div className='text-lg'>{reactionCount.like}</div>
            </button>

            <button data-reaction='dislike' className={`flex flex-row items-center ${status === 'authenticated' ? 'cursor-pointer' : ''}`} onClick={(e) => onReaction(e)}>
                <svg className={`w-5 h-5 mr-2 pointer-events-none
                ${setReactionColor('fill-orange-600', ReactionsEnum.DISLIKE)}`} viewBox="0 0 24 24"><path d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z" /></svg>
                <div className='text-lg'>{reactionCount.dislike}</div>
            </button>
        </>
    )
}
