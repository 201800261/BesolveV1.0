export interface Entry{
    id: string;
    title: string;
    description: string;
    date: string;
    user: string;
    pictureUrl;
}

export function toEntry(doc){
    return {id: doc.id, ...doc.data() }
}

export interface departmentlist{
    id: string;
    name: string;
  }

export function todepartmentlist(doc){
    return {id: doc.id, ...doc.data() }
}

export interface userdetails{
    id: string;
    username: string;
    email: string;
    department: string;
  }

export function tousername(doc){
    return {id: doc.id, ...doc.data() }
}
export interface postlist{
    description: string;
    id: string;
    title: string;
    username: string;
  }

export function topostlist(doc){
    return {id: doc.id, ...doc.data() }
}

export interface commentlist{
    id: string;
    comment: string;
    username: string;
  }

export function tocommentlist(doc){
    return {id: doc.id, ...doc.data() }
}