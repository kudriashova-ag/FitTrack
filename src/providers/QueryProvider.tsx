import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions:{
        queries: {
            staleTime: 30 * 1000, // 30 секунд
            gcTime: 5 * 60 * 1000, // 5 хвилин
            retry: 2, // кількість повторних спроб при помилці
    }}
});

type Props = {
    children: ReactNode;
};

const QueryProvider = ({children}: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({})

export default QueryProvider;
