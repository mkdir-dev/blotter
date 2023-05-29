import { API_URL } from '@/utils/config';

export const getUsers = async (token: string, query: string) => {
  const response = await fetch(`${API_URL}/users${query}`, {
    method: 'GET',
    headers: {
      // Authorization: `Bearer ${token}`,
      //
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDIwYjQ2ZmFlMjBhN2IyNGYxNzBmYTkiLCJ1c2VybmFtZSI6Im1pa2UiLCJlbWFpbCI6Im1pa2VAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODUzODIyMTksImV4cCI6MTY4NTM4NTgxOX0.PZ2QGJICcwXNK-tc2wOwonwQV8hQWkvwEQWBv03aUiI`,
      'Content-Type': 'application/json',
    },
  });

  return response;
};
