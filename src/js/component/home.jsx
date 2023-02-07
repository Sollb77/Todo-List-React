import React, {useState,useEffect} from 'react';


//include images into your bundle
//import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState(" ");
	const [toDoes, setToDoes] = useState([]);
	
	const agregarToDo = (e) => {
		e.preventDefault();
        let tempToDo = [...toDoes];
		tempToDo.push({label: inputValue, done: false});
		setToDoes(tempToDo);
		console.log(tempToDo);
		setInputValue("");
		fetch("https://assets.breatheco.de/apis/fake/todos/user/sollb", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(tempToDo),
		})
			.then((resp) => {
				console.log("STATUS");
				console.log(resp.status);
				return resp.json();
			})
			.then((data) => {
				console.log("console de la data");
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch((error) => {
				//manejo de errores
				console.log(error);
			});
	};
    useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/sollb", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				console.log("STATUS");
				console.log(resp.status);
				return resp.json();
			})
			.then((data) => {
				console.log("console de la data");
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
				setToDoes(data);
			})
			.catch((error) => {
				//manejo de errores
				console.log(error);
			});
	     }, []);
    
		 const eliminarToDo = (indice) => {
			let tempListRemove = toDoes.filter((item, i) => i!== indice); 
			console.log(tempListRemove);
			setToDoes(tempListRemove);
			fetch("https://assets.breatheco.de/apis/fake/todos/user/sollb", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(tempListRemove),
		})
			.then((resp) => {
				console.log("STATUS");
				console.log(resp.status);
				return resp.json();
			})
			.then((data) => {
				console.log("console de la data");
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch((error) => {
				//manejo de errores
				console.log(error);
			});
		 }




	return (
		<div className="container">
			<h1>To do</h1>
		  <ul className='listas'>
			<li className='completar' >
				<form onSubmit={agregarToDo}>
				<input 
			
			     type="text" 
			     onChange={(e)=> setInputValue (e.target.value)}
			     value={inputValue}
			     // onKeyPress ={(e) =>  {
				//  if (e.key === "Enter") {}
				 // }}
				placeholder= "What do yo need to do?"
			></input>
				</form>
					

			</li>
			
			{toDoes.map((elemento,index) => (
			<li className='cosas p-2'>
            {elemento.label}{" "}
                    
				<i class="fas fa-trash-alt p-2"
				onClick={() =>
				eliminarToDo(index)
				 }></i>
				</li>

			))}
			
		  </ul>
		  <div className='ult'>{toDoes.length} task</div>
		  
		</div>
	);
};

export default Home;
