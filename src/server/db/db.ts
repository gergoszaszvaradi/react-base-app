import mongoose from "mongoose";

// type DatabasePostResponse<T> = mongoose.Document<unknown, unknown, T> & { _id ?: unknown } & Required<{ _id : unknown }> | T;

interface Database {
    connect() : void;
    // post<T, U extends mongoose.Model<T>>(Model : U, data : Partial<T>) : Promise<DatabasePostResponse<T>>;
    // getAll<T, U extends mongoose.Model<T>>(Model : U) : Promise<T[]>;
    // getById<T, U extends mongoose.Model<T>>(Model : U, id : string) : Promise<T | null>;
    // update<T, U extends mongoose.Model<T>>(Model : U, id : string, data : T) : Promise<T | null>;
    // delete<T, U extends mongoose.Model<T>>(Model : U, id : string) : Promise<T | null>;
}

const db : Database = {
    connect() {
        const connectionString = process.env.MONGODB_URI;
        if (!connectionString)
            throw new Error("MongoDB connection string undefined");
        mongoose.connect(connectionString);

        mongoose.connection.on("error", console.error);
        mongoose.connection.on("connected", () => console.log("Database connected successfully!"));
    },
    // async post<T, U extends mongoose.Model<T>>(Model : U, data : Partial<T>) : Promise<DatabasePostResponse<T>> {
    //     const obj = new Model(data);
    //     return obj.save();
    // },
    // async getAll<T, U extends mongoose.Model<T>>(Model : U) : Promise<T[]> {
    //     return Array.from<T>(await Model.find());
    // },
    // async getById<T, U extends mongoose.Model<T>>(Model : U, id : string) : Promise<T | null> {
    //     return Model.findById(id);
    // },
    // async update<T, U extends mongoose.Model<T>>(Model : U, id : string, data : T) : Promise<T | null> {
    //     return Model.findByIdAndUpdate(id, data);
    // },
    // async delete<T, U extends mongoose.Model<T>>(Model : U, id : string) : Promise<T | null> {
    //     return Model.findByIdAndDelete(id);
    // },
};

export default db;
