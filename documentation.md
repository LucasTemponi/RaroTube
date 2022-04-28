[Notion do projeto](https://dot-breakfast-fe7.notion.site/Projeto-Final-Raro-Academy-efa6968837194258a442257f0167bb22) com algumas informações de desenvolvimento, links úteis e outras visões das tarefas

1. [Tipos](#tipos)
    1.1 [UsuarioProps](#UsuarioProps)
2. Componentes
3. Hooks
4. Funções

  

# Tipos <a  name  =  "tipos"></a>

  

## UsuarioProps <a  name  =  "UsuarioProps"></a>
```TypeScript
type usuarioProps = {
	nome: string,
	email: string,
	senha: string,
	foto?: string,
	turma: {
		id: string,
		nome: string,
		descricao: string
	},
	id: string,
	admin?: false
	}
```

## ComentarioProps <a  name  =  "ComentarioProps"></a>

```TypeScript
type  ComentarioProps  = {
	videoId:string|undefined
	id:  string;
	texto:  string;
	editado:  boolean;
	createdAt:  Date;
	aluno: {
		id:  string;
		admin:  boolean;
		nome:  string;
		email:  string;
		senha:  string;
		foto:  string;
	};
	meuVote?:{
		vote:string,
	}
	upVotes:  number;
	downVotes:  number;
};
```
##  VideoProps <a name="VideoProps"></a>

```TypeScript
type  videoProps  = {
	id:string,
	nome:string,
	url:string,
	thumbUrl:string,
	descricao:string,
	createdAt:Date,
	duracao:string,
	dataPublicacao:Date,
	topico:string,
	tags:string[],
}
```

## thumbnailProps
```TypeScript
interface  thumbnailProps{
	video:videoProps
	hover?:boolean
}
```

<pre>
 <code >
  interface  thumbnailProps{
	video:<a href=#videoProps>videoProps</a>
	hover?:boolean
}
 </code>
</pre>

## VideoListProps
```TypeScript
type videoListProps = {
    vertical?:boolean,
    videos:Array<videoProps> | undefined,
}
```

# Componentes

## 