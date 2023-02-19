import PocketBase, { ClientResponseError } from 'pocketbase';

export const pb = new PocketBase('http://localhost:8090');

export var currentUser =  (pb.authStore.model); 

pb.authStore.onChange(() => {
    currentUser = (pb.authStore.model);
});

export function errorMessage(error: unknown) {
    const errorObj = error as ClientResponseError;
    console.error(errorObj.message);
    return errorObj.message;
}