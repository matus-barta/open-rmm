use axum::response::{IntoResponse, Json, Response};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct ComputerSchema {
    uuid: String,
    one_time_key: String,
}

pub async fn add_computer(Json(body): Json<ComputerSchema>) -> Response {
    todo!()

    /*
    //check if otk exists and is not added and is allowed - return uuid
    const query = await prisma.computer.findMany({
        where: {
            OneTimeKey: req.body.OneTimeKey,
            IsAdded: false,
            IsAllowed: true
        },
        select: {
            Uuid: true
        }
    });

    //if query is 0 otk is not valid
    if (query.length == 0) {
        return res.send({ message: 'Forbidden' });
    } else {
        const query = await prisma.computer.update({
            //add UUID to valid otk
            where: {
                OneTimeKey: req.body.OneTimeKey
            },
            data: {
                Uuid: req.body.UUID,
                IsAdded: true
            },
            select: {
                Uuid: true
            }
        });
        if (query == null) return res.send({ message: 'Internal Error' });
        else return res.send(query);
    }
     */
}
