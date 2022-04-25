import { useState } from 'react';

export default function useToken() {


   

    return {
        setToken: saveToken,
        token
    }
}
