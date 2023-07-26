import React, { useState } from 'react';
import { postStocksData } from './api/stockApi';
import './style.css';

function App() {
	const [stockName, setStockName] = useState('');
	const [stockDate, setStockDate] = useState('');
	const [stockData, setStockData] = useState([]);
	const [error, setError] = useState({
		isError: false,
		errorName: ''
	})

	const handleInputChange = (event) => {
		const { id, value } = event.target;
		setError({ isError: false });
		setStockData([]);
		if (id === 'stockName') {
			setStockName(value);
		} else if (id === 'stockDate') {
			setStockDate(value);
		}

	}
	const maxDate = () => {
		const date = new Date().toISOString().split('T')[0];
		return date;
	}
	const handleSubmit = () => {
		event.preventDefault();
		if (!stockName && !stockDate) return;
		const body = {
			stockName,
			stockDate
		}
		postStocksData(body)
			.then((res) => {
				setStockData([res.data]);
			}).catch((err) => {
				console.log(err);
				setError({ isError: true, errorName: 'Something went wrong' });
			})
	}
	return (
		<>
			<div>
				<header>
					<h1>Stock List</h1>
				</header>
				<main>
					<form id="stockListForm" onSubmit={handleSubmit}>
						<label htmlFor="stockName">Stock Name:</label>
						<input type="text" id="stockName" value={stockName} onChange={handleInputChange} required />

						<label htmlFor="date">Date:</label>
						<input type="date" id="stockDate" value={stockDate} onChange={handleInputChange} max={maxDate()} required />

						<button type="submit">Get Data</button>
					</form>

					{error.isError ? <h2 style={{ textAlign: 'center' }}>OOPS Something Went wrong</h2> :
						<table id="stockData">
							<tbody>
								<tr>
									<th>Open</th>
									<th>High</th>
									<th>Low</th>
									<th>Close</th>
									<th>Volume</th>
								</tr>
								{stockData.map((data, index) => (
									<tr key={index}>
										<td>{data.open}</td>
										<td>{data.high}</td>
										<td>{data.low}</td>
										<td>{data.close}</td>
										<td>{data.volume}</td>
									</tr>
								))}
							</tbody>
						</table>
					}
				</main>
			</div>
		</>
	);
}

export default App;