const request = require('supertest');
const app = require('./app');

describe('POST /questions', () => {
  it('should return the first question if no initial state is provided', async () => {
    const res = await request(app)
      .post('/questions')
      .send({
        questionId: 'q1',
        initialState: true
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('question');
    expect(res.body.question).toHaveProperty('id', 1);
  });

  it('should return the next question if answer and questionId are provided', async () => {
    const res = await request(app)
      .post('/questions')
      .send({ questionId: 'q1', answer: 'yes' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('question');
    expect(res.body.question).toHaveProperty('id', 'q3');
  });

  it('should return a 404 if the question is not found', async () => {
    const res = await request(app)
      .post('/questions')
      .send({ questionId: 123, answer: 'yes' });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error', 'question not found');
  });

  it('should return the conclusion if a conclusion is found', async () => {
    const res = await request(app)
      .post('/questions')
      .send({
        questionId: 'q3',
        answer: 'yes',
        context: ['value1', 'value2']
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('conclusion', 'Found conclusion');
  });

  it('should return a "Not found" message if a conclusion is not found', async () => {
    const res = await request(app)
      .post('/questions')
      .send({
        questionId: 'q3',
        answer: 'yes',
        context: ['value1']
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('conclusion', 'Not found');
  });

  it('should return a 500 error if something went wrong', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const res = await request(app)
      .post('/questions')
      .send({ questionId: 'q1', answer: 'invalid' });
    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual('Something went wrong');
    spy.mockRestore();
  });
});