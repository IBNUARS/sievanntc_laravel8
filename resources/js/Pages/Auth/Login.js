import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

export default () => {

    //state untuk nilai input form
    const { data, setData, post, processing, errors } = useForm({
        username: "",
        password: "",
    });

    //menangani perubahan input pada form
    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;

        setData(data => ({
            ...data,
            [key]: value,
        }))
    }

    //menangani ketika form di-submit
    function handleSubmit(e) {
        e.preventDefault()
        post(route('login.attemp'), data)
    }

    return (
        <div className="page-wrapper">
            <div className="page-content--bge5">
                <div className="container">
                    <div className="login-wrap">
                        <div className="title">SISTEM EVALUASI PELATIHAN NURTAMA TECH CENTER</div>
                        <div className="login-content">



                            {/* logo */}
                            <div className="login-logo">
                                <a href="#">
                                    <img src="/images/icon/logontc.png" width="100px" alt="LPKNTC" />
                                </a>
                                <h2 className="title-3 mt-3">LOGIN ADMIN</h2>
                            </div>

                            {/* form login */}
                            <div className="login-form">
                                <form onSubmit={handleSubmit}>

                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="username" placeholder="Username"
                                            className={"au-input au-input--full " + (errors.username ? 'is-invalid' : '')}
                                            name="username"
                                            value={data.username}
                                            onChange={handleChange}
                                        />
                                        {errors.username && (
                                            <small className="form-text text-danger">{errors.username}</small>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" placeholder="Password"
                                            className={"au-input au-input--full " + (errors.password ? 'is-invalid' : '')}
                                            name="password"
                                            value={data.password}
                                            onChange={handleChange}
                                        />
                                        {errors.password && (
                                            <small className="form-text text-danger">{errors.password}</small>
                                        )}
                                    </div>

                                    <button className="au-btn au-btn--block au-btn--green m-b-20"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Login
                                    </button>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};
