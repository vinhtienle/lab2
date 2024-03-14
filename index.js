const express = require( 'express' );
const mongoose = require( 'mongoose' );

const app = express();

mongoose.connect( 'mongodb+srv://vinhdvph35610:daovanvinh@cluster0.ztfpwzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true

    } ).then( () =>
    {
        console.log( "ket noi thanh cong voi mongodb" )
    } ).catch( ( err ) =>
    {
        console.log( "loi:", err );
    } );

const db1 = mongoose.connection.useDb( 'db1' );
const SinhVienSchema = new mongoose.Schema( {
    masv: String,
    tensv: String
} );

const SinhVien = db1.model( 'sinhvien', SinhVienSchema );

app.get( '/', async ( req, res ) =>
{
    try
    {
        const sinhvien = await SinhVien.find();
        if ( sinhvien.length > 0 )
        {
            res.json( sinhvien );
        } else
        {
            res.status( 404 ).json( { error: "khong co sinh vien" } );
        }
    } catch ( error )
    {
        console.error( "loi doc du lieu:" );
        res.status( 500 ).json( { error: "doc du lieu loi" } );
    }
} )

const PORT = process.env.PORT || 5000;
app.listen( PORT, () =>
{
    console.log( 'server dang chay o 5000' );
} );