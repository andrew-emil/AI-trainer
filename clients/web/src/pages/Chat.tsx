import { Suspense } from 'react';

import { ChatContent } from '@/components/chat/ChatContent';
import MessageSkeleton from '@/components/chat/MessageSkeleton';
import DashboardLayout from '@/components/layout/DashboardLayout';


function Chat() {
    return (
        <Suspense fallback={
            <DashboardLayout>
                <MessageSkeleton />
            </DashboardLayout>
        }>
            <ChatContent />
        </Suspense>
    );
}

export default Chat;