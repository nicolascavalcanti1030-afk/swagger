import { Request, Response, NextFunction } from "express";
import { BookService } from "./book.service";

class BookController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const book = await new BookService().create(req.body);
      res.status(201).send(book);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async find(req: Request, res: Response): Promise<void> {
    try {
      const books = await new BookService().find();
      res.status(200).send(books);
    } catch (error: any) {
      res.status(500).send({ message: "Internal Server Error", error });
    }
  }

  async findByTitle(req: Request, res: Response): Promise<void> {
    console.log("🔍 findByTitle chamado! params:", req.params);
    try {
      let title: string;
      if (Array.isArray(req.params.title)) {
        title = req.params.title[0];
      }else{
        title = req.params.title;
      }

      if (!title){
        res.status(400).send({ message: "tilte parameter is missing or invalid" });
        return;
      }
      const book =await new BookService().findByTitle(title);
      if(!book || book.length === 0 ) {
        res.status(404).send({message: 'Book not found'});
        return;
      }
      res.status(200).send(book);
    } catch (error: any) {
      res.status(500).send({ 
        message: "Internal Server Error", 
        error: error.message,
        stack:error.stack
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
     let id: string;
     if(Array.isArray(req.params.id)) {
      id = req.params.id[0];
     }else{
      id = req.params.id;
     }
      
     if(!id) {
        res.status(400).send({messagem: 'ID Parameter is missing or invalid'})
        return;
      }
      const updatedBook = await new BookService().update(
        id,
        req.body
      );
      if (!updatedBook) {
        res.status(404).send({ message: "Book not found" });
        return;
      }
      res.status(200).send(updatedBook);
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      let id: string;
      if (Array.isArray(req.params.id)) {
        id = req.params.id[0];  
      }else{
        id = req.params.id;
      }
      if(!id) {
        res.status(400).send({message:'Id parameter is missing or invalid'});
        return;
      }
      const deletedBook = await new BookService().delete(id);
      if (!deletedBook) {
        res.status(404).send({ message: "Book not found" });
        return;
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).send({ message: "Internal Server Error", error });
    }
  }
}

export default new BookController();
