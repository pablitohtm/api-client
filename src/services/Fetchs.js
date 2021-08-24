const URL_API = "http://localhost:8088/posts/";

export const postsList = async() => {
    const res = await fetch(URL_API)
    const data = await res.json()
  
    return data
}

export const insertPost = async(data) => {
    console.log(data);
    const res = await fetch(URL_API, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({titulo: data.titulo, conteudo: data.conteudo})
  });
  const content = await res;
  return content;
}

export const votePost = async(id,vote) => {
    const res = await fetch(URL_API + id + "/" + vote, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([])
  });
  const content = await res;
  return content;
}