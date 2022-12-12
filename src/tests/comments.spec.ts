import { CommentController } from "../controllers/CommentController";
import Comment from "../models/comments/Comment";
import express from "express";

describe("test for comments controller", () => {
  const app = express();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("test for get comments", () => {
    it("test comments success", async () => {
      const commentController = CommentController.getInstance(app);
      const comments: Comment[] = [];

      const req: any = {
        params: {
          uid: "123",
          sid: "145",
        },
      };

      const res: any = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      };

      jest
        .spyOn(CommentController.commentDao, "getComments")
        .mockReturnValue(Promise.resolve(comments));

      await commentController.getComments(req, res);

      expect(res.status).toBeCalledWith(200);
      expect(res.status().json).toBeCalledWith(comments);
    });

    it("test comments failure", async () => {
      const app = express();
      const commentController = CommentController.getInstance(app);

      const req: any = {
        params: {
          uid: "123",
          sid: "145",
        },
      };

      const res: any = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      };

      jest
        .spyOn(CommentController.commentDao, "getComments")
        .mockReturnValue(Promise.reject(new Error("error")));

      await commentController.getComments(req, res);

      expect(res.status).toBeCalledWith(404);
    });
  });

  describe("test for add comments", () => {
    it("test add comments success", async () => {
      const commentController = CommentController.getInstance(app);
      const comments: Comment[] = [];

      const req: any = {
        params: {
          uid: "123",
          sid: "145",
        },
        body: {
          comment: "test",
        },
      };

      const res: any = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      };

      const spyFunc = jest
        .spyOn(CommentController.commentDao, "addComment")
        .mockReturnValue(Promise.resolve(comments));

      await commentController.addComment(req, res);

      expect(spyFunc).toBeCalledWith("123", "145", "test");
      expect(res.status).toBeCalledWith(200);
      expect(res.status().json).toBeCalledWith(comments);
    });

    it("test add comments failure", async () => {
      const commentController = CommentController.getInstance(app);

      const req: any = {
        params: {
          uid: "123",
          sid: "145",
        },
        body: {
          comment: "test",
        },
      };

      const res: any = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      };

      jest
        .spyOn(CommentController.commentDao, "addComment")
        .mockReturnValue(Promise.reject());

      await commentController.addComment(req, res);

      expect(res.status).toBeCalledWith(403);
    });
  });

  describe("test for update comments", () => {
    it("test update comments success", async () => {
      const commentController = CommentController.getInstance(app);
      const comments: Comment[] = [];

      const req: any = {
        params: {
          uid: "123",
          sid: "145",
          cid: "333",
        },
        body: {
          comment: "test",
        },
      };

      const res: any = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      };

      const spyFunc = jest
        .spyOn(CommentController.commentDao, "updateComment")
        .mockReturnValue(Promise.resolve(comments));

      await commentController.updateComment(req, res);

      expect(spyFunc).toBeCalledWith("123", "333", "test");
      expect(res.status).toBeCalledWith(200);
      expect(res.status().json).toBeCalledWith(comments);
    });

    it("test update comments failure", async () => {
      const commentController = CommentController.getInstance(app);

      const req: any = {
        params: {
          uid: "123",
          sid: "145",
        },
        body: {
          comment: "test",
        },
      };

      const res: any = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      };

      jest
        .spyOn(CommentController.commentDao, "updateComment")
        .mockReturnValue(Promise.reject());

      await commentController.updateComment(req, res);

      expect(res.status).toBeCalledWith(403);
    });
  });

  describe("test for delete comments", () => {
    it("test delete comments success", async () => {
      const commentController = CommentController.getInstance(app);
      const comments: Comment[] = [];

      const req: any = {
        params: {
          uid: "123",
          cid: "333",
        },
      };

      const res: any = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      };

      const spyFunc = jest
        .spyOn(CommentController.commentDao, "deleteComment")
        .mockReturnValue(Promise.resolve(comments));

      await commentController.deleteComment(req, res);

      expect(spyFunc).toBeCalledWith("123", "333");
      expect(res.status).toBeCalledWith(200);
      expect(res.status().json).toBeCalledWith(comments);
    });

    it("test delete comments failure", async () => {
      const commentController = CommentController.getInstance(app);

      const req: any = {
        params: {
          uid: "123",
          cid: "145",
        },
      };

      const res: any = {
        status: jest.fn().mockReturnValue({ json: jest.fn() }),
      };

      jest
        .spyOn(CommentController.commentDao, "deleteComment")
        .mockReturnValue(Promise.reject());

      await commentController.deleteComment(req, res);

      expect(res.status).toBeCalledWith(403);
    });
  });
});
