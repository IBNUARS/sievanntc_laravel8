import React from 'react';
import { Inertia} from '@inertiajs/inertia';

export default ({modal, closeModal}) => {
  //menangani ketika klik OK
  const handleYakin = () => {
    //Arahkan ke route sesuai props route dg method delete
    Inertia.put(modal.link).then(()=>{
      closeModal();
    });
  };

  return (
    <div style={{display: modal.open ? 'block' : 'none'}} className="modal fade show" id="staticModal" tabIndex="-1" role="modal" aria-labelledby="staticModalLabel" data-backdrop="static">
        <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
                <div className="modal-body">
                    <br/><br/>
                    <p>
                       {modal.text}
                    </p>
                    <br/><br/>
                </div>
                <div className="modal-footer">
                    {modal.isConfirm ? (
                        <div>
                        <button onClick={closeModal} style={{marginRight: 10}} type="button" className="btn btn-success btn-md">Batal</button>
                        <button onClick={handleYakin} type="button" className="btn btn-danger btn-md">Yakin</button>
                        </div>
                    ):(
                        <button onClick={handleYakin} type="button" className="btn btn-danger btn-md">OK</button>
                    )}

                </div>
            </div>
        </div>
    </div>
  );
}