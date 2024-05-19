import React from 'react';

// Props type definition
interface GroupItemProps {
    group: {
        _id: string;
        groupName: string;
        groupDescription?: string;
        avatarUrl?: string;
        members : string[];
    };
    onGroupClick: (groupName: string, groupId: string, members: string[]) => void;
}

const GroupItem: React.FC<GroupItemProps> = ({ group, onGroupClick }) => {
    return (
        <div
            className="flex items-center mb-4 cursor-pointer text-white hover:text-black hover:bg-gray-400 active:bg-gray-50 p-2 rounded-md"
            onClick={() => onGroupClick(group.groupName, group._id, group.members)}
        >
            <div className="w-12 h-12 rounded-full mr-3">
                <img
                    src={group.avatarUrl || `https://placehold.co/200x200/FFFAF0/0A0A0A.svg?text=${group.groupName.charAt(0).toUpperCase()}&font=Lato`}
                    alt="Group Avatar"
                    className="w-12 h-12 rounded-full bg-white border-4 border-solid border-indigo-500/75"
                />
            </div>
            <div className="flex-1">
                <h2 className="text-lg font-semibold">{group.groupName}</h2>
                <p className="text-gray-300">{group.groupDescription || 'No description'}</p>
            </div>
        </div>
    );
};

export default GroupItem;
