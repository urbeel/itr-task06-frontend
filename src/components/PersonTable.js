import {useEffect, useState} from "react";
import axios from "axios";
import React from "react";

export function PersonTable() {
    const backendUrl = "https://urbel-task06-backend.herokuapp.com/";
    let id = 1;
    const [seed, setSeed] = useState(0);
    const [locale, setLocale] = useState("ru_RU");
    const [errors, setErrors] = useState(0.0);
    const [people, setPeople] = useState([]);
    const [limit, setLimit] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (fetching) {
            axios.get(backendUrl + `/person?seed=${seed}&limit=${limit}&page=${currentPage}&errors=${errors}&locale=${locale}`)
                .then(response => {
                    setPeople([...people, ...response.data]);
                    setLimit(10);
                    setCurrentPage(prevState => prevState + 1);
                })
                .finally(() => setFetching(false));
        }
    }, [fetching, currentPage, limit, people, errors, locale, seed])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true)
        }
    }

    const clickRandomBtnHandler = () => {
        const number = Math.floor(Math.random() * 1000);
        setSeed(number);
        reloadTableData();
    }

    const changeSeedHandler = (e) => {
        setSeed(e.target.value);
        reloadTableData();
    }

    const reloadTableData = () => {
        setCurrentPage(1);
        setPeople([]);
        setLimit(20);
        setFetching(true);
    }

    const changeErrorsHandler = (e) => {
        setErrors(e.target.value);
        reloadTableData();
    }

    const selectLocaleHandler = (e) => {
        setLocale(e.target.value);
        reloadTableData()
    }

    return (
        <div className="row">
            <label className="col">
                Seed:
                <input type="number" value={seed} className={'form-control'} onChange={changeSeedHandler}/>
                <button className={'btn btn-primary btn-sm'} onClick={clickRandomBtnHandler}>RANDOM</button>
            </label>
            <label className="col">
                Locale:
                <select className={'form-select'} onChange={selectLocaleHandler}>
                    <option value={'ru_RU'}>ru_RU</option>
                    <option value={'pl_PL'}>pl_PL</option>
                    <option value={'en_US'}>en_US</option>
                </select>
            </label>
            <label className="form-label col">
                Errors
                <input type={"number"} className={'form-control'} min='0' max='1000' value={errors}
                       onChange={changeErrorsHandler}/>
                <input type="range" value={errors} className="form-range" min="0" max="10" step="0.25"
                       onChange={changeErrorsHandler}/>
            </label>
            <div className={'table-responsive'}>
                <table className={'table table-borderless'}>
                    <thead>
                    <tr>
                        <th/>
                        <th>ID</th>
                        <th>Full name</th>
                        <th>Phone number</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {people.map(person =>
                        <tr key={id++}>
                            <td>{id}</td>
                            <td>{person.id}</td>
                            <td>{person.lastName + ' ' + person.firstName + ' ' + person.middleName}</td>
                            <td className={'phone-cell'}>{person.phoneNumber}</td>
                            <td>{person.address}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}