const BASEURL = 'https://randomuser.me/api/?results=30';

export async function $fecthUserData() {
    const res = await fetch(BASEURL);
    return res.json();
}
