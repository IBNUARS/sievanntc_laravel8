import React from 'react';
import { Inertia} from '@inertiajs/inertia';

export default ({openDialog, closeDialog, route}) => {
  //menangani ketika klik OK
  const handleYakin = () => {
    //Arahkan ke route sesuai props route dg method delete
    Inertia.delete(route).then(()=>{
      closeDialog();
    });
  };

  return (
    <div style={{display: openDialog ? 'block' : 'none'}} className="modal fade show" id="staticModal" tabIndex="-1" role="dialog" aria-labelledby="staticModalLabel" data-backdrop="static">
        <div className="modal-dialog modal-md" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title" id="staticModalLabel">Konfirmasi</h3>
                </div>
                <div className="modal-body">
                    <p>
                        Yakin akan menghapus data?
                    </p>
                </div>
                <div className="modal-footer">
                    <button onClick={closeDialog} type="button" className="btn btn-success btn-md" data-dismiss="modal">Batal</button>
                    <button onClick={handleYakin} type="button" className="btn btn-danger btn-md">Yakin</button>
                </div>
            </div>
        </div>
    </div>
  );
}
